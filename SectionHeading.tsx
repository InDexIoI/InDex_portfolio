import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeading({ title, subtitle, alignment = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
          <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {title}
          </span>
          <span className="text-primary">.</span>
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className={`mt-6 h-1 w-20 bg-primary/50 rounded-full ${alignment === "center" ? "mx-auto" : ""}`} />
      </motion.div>
    </div>
  );
}
