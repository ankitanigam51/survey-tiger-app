import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
  } from "reactstrap";
  import { useState } from "react";
  import { useParams, useHistory } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { surveySlice } from "../store/surveySlice";
  
  function MultiSelect() {
    const { surveyId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [options, setOptions] = useState([""]);
    const [question, setQuestion] = useState("");
  
    const addQuestionClickAction = () => {
      const payload = {
        options,
        question,
        surveyId,
        type: "multiple",
      };
      dispatch(surveySlice.actions.addQuestion(payload));
      history.push("/create/" + surveyId + "?clear=true");
    };
  
    const addOption = (optionIdx) => {
      if (options.length < 4) {
        const newOptions = [...options, ""];
        const newOptionIdx = optionIdx + 1;
        let currentNewOptionIndex = newOptions.length - 1;
        while (newOptionIdx !== currentNewOptionIndex) {
          // shift the data one index backward
          newOptions[currentNewOptionIndex] =
            newOptions[currentNewOptionIndex - 1];
          currentNewOptionIndex--;
          newOptions[currentNewOptionIndex] = "";
        }
        setOptions(newOptions);
      }
    };
    const removeOption = (optionIdx) => {
      if (options.length > 1) {
        options.splice(optionIdx, 1);
        setOptions([...options]);
      }
    };
  
    const setOptionInArray = (value, optionIdx) => {
      options[optionIdx] = value;
      setOptions([...options]);
    };
  
    const isQuestionAddPublishDisabled = () =>
      question.trim() === "" ||
      options.find((opt) => opt.trim() === "") !== undefined;
  
    return (
      <div className="question-container">
        <InputGroup className="input-grp">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>?</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Your Question"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
        </InputGroup>
        <p className="options-text">Options</p>
        {options.map((option, optionIdx) => (
          <InputGroup className="input-grp" key={optionIdx}>
            <Input
              placeholder={`Option ${optionIdx + 1}`}
              value={option}
              onChange={(e) => setOptionInArray(e.target.value, optionIdx)}
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={() => addOption(optionIdx)}
                disabled={options.length === 4}
              >
                +
              </Button>
              <Button
                onClick={() => removeOption(optionIdx)}
                disabled={options.length === 1}
              >
                -
              </Button>
            </InputGroupAddon>
          </InputGroup>
        ))}
  
        {options.length === 4 ? (
          <div className="question-buttons">
            <Button
              className="survey-main-btn"
              disabled={isQuestionAddPublishDisabled()}
              onClick={addQuestionClickAction}
            >
              Add Question
            </Button>
            <Button
              className="survey-main-btn"
              disabled={isQuestionAddPublishDisabled()}
            >
              Publish
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
  
  export default MultiSelect;