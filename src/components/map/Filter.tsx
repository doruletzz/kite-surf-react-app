import React, { useState, Dispatch, SetStateAction } from "react";
import { Button, Form } from "react-bootstrap";
import { FilterOption } from "../../pages/dashboard/Dashboard";

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
        <h5 onClick={() => setIsSelected(true)}>Filters</h5>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="formCountryFilter">
            <Form.Label>Country</Form.Label>
            <Form.Control
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
            <Form.Label>Wind Probability</Form.Label>
            <Form.Control
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
            onClick={() => {
              setIsSelected(false);
              setIsFilterSelected((isSelected) => !isSelected);
            }}
          >
            {isFilterSelected ? "unapply" : "apply"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Filter;
