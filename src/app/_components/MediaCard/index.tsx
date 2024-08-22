import styles from "./index.module.css";

type Guest = {
  name: string;
  url: URL;
};

type Props = {
  title: string;
  text: string;
  date: string;
  guests: Guest[];
};

export default function MediaCard(props: Props) {
  return (
    <section className={styles.MediaCard}>
      <header>
        <h2>{props.title}</h2>
        <p>
          guest:
          <ul>
            {props.guests.map((guest) => {
              return (
                <li>
                  <a href={guest.url.href}>{guest.name}</a>
                </li>
              );
            })}
          </ul>
        </p>
      </header>
      <article>{props.text}</article>
      <footer>
        <p>
          published_at: <time dateTime={props.date}>{props.date}</time>
        </p>
      </footer>
    </section>
  );
}
