import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
//import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  //Modification with addition of a useState-UseEffect to wait for data to return
  const [byDateDesc, setByDateDesc] = useState([]);

  useEffect(() => {
    if (data && data.focus) {
      setByDateDesc(data.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
      ));
    }
  },[data]);
  
  //Modification with addition of -1 to avoid displaying an empty window
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length-1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });

  //Modification with transformation of inputs into bullets
  //Fixed retrieving the month from the event date
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{new Date(event.date).toLocaleString('fr-FR', { month: 'long' })}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            {byDateDesc.map((_, radioIdx) => (
              <div className={`SlideCard__pagination_radio-button ${index === radioIdx ? "SlideCard__pagination_radio-button_active" : ""}`}>  
              </div>))}
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;

/*<input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  //checked={idx === radioIdx}
                  className={`SlideCard__pagination_radio-button ${index === radioIdx ? "SlideCard__pagination_radio-button_active" : ""}`}
                />*/