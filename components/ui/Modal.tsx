import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            bg-primary-200/20 
            backdrop-blur-sm 
            fixed 
            inset-0
            z-40
          "
        />
        <Dialog.Content
          className="
            fixed 
            drop-shadow-md 
            border 
            border-secondary 
            top-[50%] 
            left-[50%] 
            max-h-full 
            h-full 
            md:h-auto 
            md:max-h-[85vh] 
            w-full 
            md:w-[90vw] 
            md:max-w-[450px] 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-md 
            bg-primary-200 
            p-[25px] 
            focus:outline-none
            z-50
            
          "
        >
          <Dialog.Title
            className="
              text-2xl 
              font-poppins 
              mb-4
              mt-4
              text-secondary
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
              mb-5  
              leading-normal 
              
            "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
                text-secondary 
                hover:text-accent 
                absolute 
                top-[10px] 
                right-[10px] 
                inline-flex 
                h-[25px] 
                w-[25px] 
                appearance-none 
                items-center 
                justify-center 
                rounded-full 
                focus:outline-none
                flex
                jsutify-center
                items-center
                hover:bg-primary
              "
              aria-label="Close"
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
