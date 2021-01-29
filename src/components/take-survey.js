import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

function TakeSurvey() {
  const surveyIDs = useSelector((globalStore) =>
    globalStore.surveys.filter((s) => s.isPublished).map((s) => s.surveyId)
  );

  return (
    <>
      {surveyIDs.map((surveyId) => (
        <Button className="survey-main-btn" key={surveyId}>
          Take Survey {surveyId}
        </Button>
      ))}
    </>
  );
}

export default TakeSurvey;