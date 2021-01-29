import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { surveySlice } from "../store/surveySlice";

function ConfirmSurvey() {
  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const survey = useSelector((globalStore) =>
    globalStore.surveys.find((s) => s.surveyId === surveyId)
  );

  const confirmAndPublishSurvey = () => {
    dispatch(surveySlice.actions.markPublished({ surveyId }));
    history.push("/");
  };

  return (
    <>
      {survey.questions.map((q) => (
        <>
          <h4>{q.question}</h4>
          {q.type === "single" ? (
            <>
              <label>{q.options[0]}</label>
              <input type="radio" />
              <label>{q.options[1]}</label>
              <input type="radio" />
            </>
          ) : (
            <>
              <label>{q.options[0]}</label>
              <input type="checkbox" />
              <label>{q.options[1]}</label>
              <input type="checkbox" />
              <label>{q.options[2]}</label>
              <input type="checkbox" />
              <label>{q.options[3]}</label>
              <input type="checkbox" />
            </>
          )}
          <hr/>
        </>
      ))}
      <Button className="survey-main-btn" onClick={confirmAndPublishSurvey}>
        Confirm Survey
      </Button>
    </>
  );
}

export default ConfirmSurvey;
