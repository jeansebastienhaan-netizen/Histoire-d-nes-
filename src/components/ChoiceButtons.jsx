export default function ChoiceButtons({ choices, onChoose }) {
  return (
    <div className="choices">
      {choices.map((choice, i) => (
        <button key={i} className="btn btn-choice" onClick={() => onChoose(choice)}>
          {choice.label}
        </button>
      ))}
    </div>
  )
}
