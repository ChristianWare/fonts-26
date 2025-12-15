import styles from "./SectionIntro.module.css";

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
      <span className={`${styles.text} ${styles[color]}`}>{title}</span>
    </div>
  );
}
