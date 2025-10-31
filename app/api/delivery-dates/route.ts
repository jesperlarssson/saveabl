// app/api/delivery-dates/route.ts
import { NextResponse } from "next/server";
import { getDeliveryDatesForProduct } from "@/lib/hygraph";
import {
  stockholmPostalCodes1,
  stockholmPostalCodes2,
  stockholmPostalCodes3,
  skanePostalCodes1,
  skanePostalCodes2,
  vastPostalCodes1,
  vastPostalCodes2,
  vastPostalCodes3,
  vastPostalCodes4,
  vastPostalCodes5,
  vastPostalCodes6,
  vastPostalCodes7,
} from "@/lib/zipCodes";

// DK pausad (behåll tom)
const shippingDk: string[] = [];

/**
 * Vilka veckodagar som får visas per postnummer.
 * 0 = sön, 1 = mån, ... 6 = lör
 */
function allowedWeekdaysForZip(zip: string): number[] {
  if (stockholmPostalCodes1.includes(zip)) return [0, 1];
  if (stockholmPostalCodes2.includes(zip)) return [0];
  if (stockholmPostalCodes3.includes(zip)) return [1];

  if (skanePostalCodes1.includes(zip)) return [0, 1];
  if (skanePostalCodes2.includes(zip)) return [1];

  if (vastPostalCodes1.includes(zip)) return [6, 0, 1];
  if (vastPostalCodes2.includes(zip)) return [6, 1];
  if (vastPostalCodes3.includes(zip)) return [1];
  if (vastPostalCodes4.includes(zip)) return [6];
  if (vastPostalCodes5.includes(zip)) return [0];
  if (vastPostalCodes6.includes(zip)) return [6, 0];
  if (vastPostalCodes7.includes(zip)) return [0, 1];

  if (shippingDk.includes(zip)) return [];
  return [];
}

// ---- Helpers för att bygga windows av exakta datum (ingen omloggik) ----
const toEpoch = (dateStr: string, hh: number, mm: number) => {
  // Anta svensk tid; justera vid behov för DST i framtiden
  const d = new Date(
    `${dateStr}T${String(hh).padStart(2, "0")}:${String(mm).padStart(
      2,
      "0"
    )}:00+01:00`
  );
  return Math.floor(d.getTime() / 1000);
};

function buildWindowsFromProductDates(rec: {
  saturday?: string | null;
  sunday?: string | null;
  monday?: string | null;
}) {
  // Skapa endast maskinella fält – ingen text/label här
  const out: { start: number; end: number; weekday: number }[] = [];
  if (rec.saturday) out.push({ start: toEpoch(rec.saturday, 9, 0), end: toEpoch(rec.saturday, 18, 0), weekday: 6 });
  if (rec.sunday)   out.push({ start: toEpoch(rec.sunday, 10, 0), end: toEpoch(rec.sunday, 17, 0), weekday: 0 });
  if (rec.monday)   out.push({ start: toEpoch(rec.monday, 16, 0), end: toEpoch(rec.monday, 22, 0), weekday: 1 });
  return out;
}

// ----------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const zip = (searchParams.get("zip") || "").trim();

    // Skicka med ?product=Saveabl%20Gård eller ?product=Saveabl%20Grön
    const product = (searchParams.get("product") || "Saveabl Gård").trim(); // default till Gård

    // 1) Hämta EXAKT de datum du lagt in i Hygraph för vald produkt
    const rec = await getDeliveryDatesForProduct(product);

    if (!rec) {
      // Ingen post i Hygraph för den produkten -> tomt svar
      return NextResponse.json(
        { windows: [], weekdaysWithDays: [], soldOut: false, product },
        { status: 200 }
      );
    }

    // 2) Bygg windows av de exakta datumen (utan omloggik)
    const allWindows = buildWindowsFromProductDates(rec);

    // 3) Filtrera endast på tillåtna veckodagar beroende på postnummer
    const allowed = allowedWeekdaysForZip(zip);
    const windows = allWindows.filter(
      (w) => !allowed.length || allowed.includes(w.weekday)
    );

    return NextResponse.json(
      { windows, weekdaysWithDays: [], soldOut: !!(rec as any).soldOut, product },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/delivery-dates failed", error);
    return NextResponse.json(
      { windows: [], weekdaysWithDays: [], soldOut: false },
      { status: 200 }
    );
  }
}
