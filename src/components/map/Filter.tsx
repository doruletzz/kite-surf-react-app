import React, { useState, Dispatch, SetStateAction } from "react";
import { Button, Form } from "react-bootstrap";
import { FilterOption } from "../../pages/dashboard/Dashboard";

import "./Filter.scss";

import filterSrc from "../../assets/filter.svg";

type FilterProps = {
  filterOptions: FilterOption;
  setFilterOptions: Dispatch<SetStateAction<FilterOption>>;
  isFilterSelected: boolean;
  setIsFilterSelected: Dispatch<SetStateAction<boolean>>;
};

const Filter = ({
  filterOptions,
  setFilterOptions,
  isFilterSelected,
  setIsFilterSelected,
}: FilterProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div>
      {!isSelected ? (
        <h5 className="title" onClick={() => setIsSelected(true)}>
          <span>
            <img src={filterSrc} className="filter_icon" />
            Filters
          </span>
        </h5>
      ) : (
        <Form className="filter_form">
          <Form.Group className="content" controlId="formCountryFilter">
            <Form.Label className="label">Country</Form.Label>
            <Form.Control
              className="control"
              value={filterOptions.country}
              onChange={(event) =>
                setFilterOptions({
                  ...filterOptions,
                  country: event.target.value,
                })
              }
              type="text"
              placeholder="Romania"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCountryFilter">
            <Form.Label className="label">Wind Probability</Form.Label>
            <Form.Control
              className="control"
              type="number"
              value={filterOptions.probability}
              onChange={(event) =>
                setFilterOptions({
                  ...filterOptions,
                  probability:
                    parseInt(event.target.value) && parseInt(event.target.value)
                      ? parseInt(event.target.value)
                      : 0,
                })
              }
              placeholder="100"
            />
          </Form.Group>

          <Button
            className={!isFilterSelected ? "button_apply" : "button_unapply"}
            onClick={() => {
              setIsSelected(false);
              setIsFilterSelected((isSelected) => !isSelected);
            }}
          >
            {isFilterSelected ? "UNAPPLY FILTER" : "APPLY FILTER"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Filter;
