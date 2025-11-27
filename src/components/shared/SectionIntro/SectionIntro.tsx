import styles from "./SectionIntro.module.css";
import Star from "@/components/icons/Star/Star";

interface Props {
  title: string;
  color?: string;
  borderColor?: string;
}

export default function SectionIntro({
  title,
  color = "",
  borderColor = "",
}: Props) {
  return (
    <div className={`${styles.container} ${styles[borderColor]}`}>
      <Star className={`${styles.icon} ${styles[color]}`} />
      <span className={`${styles.text} ${styles[color]}`}>{title}</span>
    </div>
  );
}
