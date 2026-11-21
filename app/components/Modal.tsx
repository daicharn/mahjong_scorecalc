import styles from './Modal.module.css'

type TypeModal = {className: string, h2: string, p: string, children: React.ReactNode};

export default function Modal(props: TypeModal){
    return (
      <div className={`${styles.modal} ${props.className}`}>
        <h2>{props.h2}</h2>
        <p>{props.p}</p>
        {props.children}
      </div>
    )
}