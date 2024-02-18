import { cn } from "@/lib/utils";

type LogoProps = {
    className?: string;
}

export const Logo = ({className=""}:LogoProps) => {
    return <div className={
        cn(
            "text-white text-sm", className
        )
    }>
        FINGREAT
    </div>
}