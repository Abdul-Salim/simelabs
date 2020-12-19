import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./Home.css";
function Home() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({});
  const [date, setDate] = useState("2020-12-17");
  const options = {
    responsive: true,
  };
  const chart = () => {
    let para = [];
    let count = [];
    axios
      .get(
        `https://api.openaq.org/v1/measurements/?city=Delhi&order_by=date&date_from=${date}&date_to=${date}&limit=7`
      )
      .then((res) => {
        console.log(res.data.results);
        if (res.data.results === undefined || res.data.results.length === 0) {
          alert(
            "Data is not available on the selected date. Please choose another date"
          );
        }
        setLoading(false);
        for (const dataObj of res.data.results) {
          para.push(dataObj.parameter);
          count.push(dataObj.value);
        }
        setChartData({
          labels: para,
          datasets: [
            {
              label: "level of thickness",
              data: count,
              backgroundColor: [
                "#EE82EE",
                "#4B0082",
                "#0000FF",
                "#00FF00",
                "#FFFF00",
                "#FFA500",
                "#FF0000",
              ],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(para, count);
  };

  useEffect(() => {
    setLoading(true);
    chart();
  }, [date]);
  return (
    <Container>
      <Row>
        <Col md="6" className="mt-4">
          <h1 className="mb-5 mt-5">Air pollution data of Delhi</h1>
          <br />
          <h3>Choose a date to see the amount of air pollution of that date</h3>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="date"
                placeholder="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md="12" className="mt-5 mb-5 chart" id="chart_section">
          {loading ? (
            "fetching data"
          ) : (
              <Bar data={chartData} options={options} />
            )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
