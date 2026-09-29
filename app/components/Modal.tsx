type TypeModal = {className: string, h2: string, p: string};

export default function Modal(props: TypeModal){
    return (
      <div className={`modal ${props.className}`}>
        <h2>{props.h2}</h2>
        <p>{props.p}</p>
      </div>
    )
}