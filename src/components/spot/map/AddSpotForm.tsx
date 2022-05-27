import { Dispatch, FormEvent, SetStateAction } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useAppDispatch } from "../../../features/app/hooks";
import { addSpot } from "../../../features/spot/slice";
import { Spot } from "../../../features/spot/types";

import "./AddSpotForm.scss";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type AddSpotFormProps = {
  spot: Spot;
  setSpot: Dispatch<SetStateAction<Spot>>;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
};

const AddSpotForm = ({ spot, setSpot, setShowAddForm }: AddSpotFormProps) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setShowAddForm(false);
    dispatch(addSpot(spot));
  };

  return (
    <Form onSubmit={handleSubmit} className="add_form">
      <div
        className="close_button"
        role="button"
        onClick={() => setShowAddForm(false)}
      >
        x
      </div>
      <h3>Add Spot</h3>
      <Row>
        <Form.Group className="group">
          <Form.Label className="label">Name</Form.Label>
          <Form.Control
            className="control"
            required
            type="text"
            name="name"
            value={spot.name}
            onChange={(event) =>
              setSpot((prev) => ({ ...prev, name: event.target.value }))
            }
            placeholder="Crooks, Bergstrom and O'Conner"
          />
        </Form.Group>
        <Form.Group className="group">
          <Form.Label className="label">Country</Form.Label>
          <Form.Control
            className="control"
            required
            type="text"
            name="country"
            value={spot.country}
            onChange={(event) =>
              setSpot((prev) => ({ ...prev, country: event.target.value }))
            }
            placeholder="Spain"
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} className="group">
          <Form.Label className="label">Wind Probability</Form.Label>
          <Form.Control
            className="control"
            type="number"
            name="probability"
            value={spot.probability}
            onChange={(event) =>
              setSpot((prev) => ({
                ...prev,
                probability: parseFloat(event.target.value) % 101,
              }))
            }
          />
        </Form.Group>
        <Form.Group as={Col} className="group">
          <Form.Label className="label">When to go</Form.Label>
          <Form.Control
            className="control"
            as="select"
            name="date"
            required
            value={spot.month}
            onChange={(event) =>
              setSpot((prev) => ({
                ...prev,
                month: event.target.value,
              }))
            }
          >
            {MONTHS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} className="group">
          <Form.Label className="label">Latitude</Form.Label>
          <Form.Control
            className="control"
            disabled
            type="text"
            value={spot.lat.toFixed(2)}
            name="latitude"
          />
        </Form.Group>
        <Form.Group as={Col} className="group">
          <Form.Label className="label">Longitude</Form.Label>
          <Form.Control
            className="control"
            disabled
            type="text"
            value={spot.long.toFixed(2)}
            name="longitude"
          />
        </Form.Group>
      </Row>

      <Row>
        <Col>
          <Button
            className="cancel_spot_button"
            onClick={() => setShowAddForm(false)}
          >
            cancel
          </Button>
        </Col>

        <Col>
          <Button className="add_spot_button" type="submit">
            confirm
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddSpotForm;
