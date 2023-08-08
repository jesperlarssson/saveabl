import Stripe from "stripe";

export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}

export interface Recipe {
  createdAt: string | number | Date;
  deprecated: boolean;
  id: string;
  title: string;
  slug: string;
  startDate: string;
  weekNr: number;
  recipeNumber: number;
  steg: string[];
  ingredients: string[];
  nutritionalValues: string;
  savedIngredients: string;
  contentAllergies: string;
  chef: Chef;
  image: HyImage;
  freezabl: boolean;
}

export interface Chef {
  name: string;
  title: string;
}

export interface HyImage {
  url: string;
}

interface Picture {
  url: string;
}

interface Author {
  name: string;
  title: string;
  picture: Picture;
}

export interface Post {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  coverImage: Picture;
  author: Author;
  content?: any;
}

export interface PostsData {
  posts: Post[];
}

{
  /** Saveabl specifics */
}

export interface DeliveryRange {
  start: number;
  end: number;
}

export interface Mealkit {
  id?: string;
  price_id?: string;
  product_id?: string;
  cut_off_time: number;
  week_number: number;
  delivery_range: DeliveryRange;
  quantity: number;
  amount_sold?: number;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface ProductInfo {
  id: string;
  title: string;
  price_id: string;
  prices?: Price;
  excerpt: string;
  description: string;
  price: number;
  portions: number;
  recipes?: number;
  favorite?: boolean;
  img_src: string;
  subscription?: boolean;
  every_week?: boolean;
  type?: string;
}

export interface AddOn {
  id: string;
  name: string;
  price_id: number;
  description: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Delivery {
  id: string;
  user_id: string;
  users?: UserDetails;
  selectedWeekDay: number;
  selectedWeekDayEpoch?: number;
  selectedWeekDayName: string;
  addOns?: AddOn[];
  mealkit_id?: string;
  mealkits?: Mealkit;
}

export interface Type {
  odd: boolean;
  even: boolean;
}
