import Image from "next/image";
import { CometCard } from "./ui/comet-card";

export function CryptoCoin({ className, src }) {
  return (
    <div className={className}>
      <CometCard>
        <button
          type="button"
          className=" flex cursor-pointer   "
          aria-label="View invite F7RA"
          style={{
            transformStyle: "preserve-3d",
            transform: "none",
            opacity: 1,
          }}
        >
          <div className="mx-2 flex-1">
            <div className="flex justify-center items-center  ">
              <Image
                loading="eager"
                className="w-full object-cover contrast-75"
                alt="Invite background"
                src={src}
                height={30}
                width={30}
              />
            </div>
          </div>
        </button>
      </CometCard>
    </div>
  );
}
