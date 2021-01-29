import React, { useState, useEffect } from "react";
import MultiSelect from "./multi-select";
import SingleSelect from "./single-select";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function CreateSurvey() {
  const { surveyId } = useParams();
  const query = useLocation().search;
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState("Select Question Type");

  useEffect(() => {
    if(query === '?clear=true') {
      setDropdownText("Select Question Type");
      history.push('/create/' + surveyId);
    }

  }, [query, history, surveyId]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <p>
        Survey ID: <b>{surveyId}</b>
      </p>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{dropdownText}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => setDropdownText("Multi Select Question")}
          >
            Multi Select Question
          </DropdownItem>
          <DropdownItem
            onClick={() => setDropdownText("Single Select Question")}
          >
            Single Select Question
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {dropdownText === "Multi Select Question" ? <MultiSelect /> : null}
      {dropdownText === "Single Select Question" ? <SingleSelect /> : null}
    </>
  );
}

export default CreateSurvey;
