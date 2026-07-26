import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  title: string;
  breadcrumb: { label: string; href?: string }[];
}

export function PageHero({ title, breadcrumb }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>{title}</h1>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          {breadcrumb.map((item, i) => (
            <span key={i} className={styles.breadcrumbItem}>
              {i > 0 && <ChevronRight size={14} className={styles.separator} />}
              {item.href ? (
                <Link href={item.href} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.breadcrumbCurrent}>{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
