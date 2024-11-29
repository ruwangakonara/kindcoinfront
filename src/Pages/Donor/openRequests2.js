import React, { useState, useContext, useEffect } from "react";
import { Container, Grid, Header, Form, Button } from "semantic-ui-react";
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar3 from "../../Components/Donor/Sidebar/Sidebar3";
import OpenRequest from "../../Components/Donor/Request/OpenRequest";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from "../../Components/Home/UserConext/UserContext";
import axios from "axios";
import "./OpenRequestList.css";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9013",
  withCredentials: true,
});

function OpenRequestList() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const { userDetails } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    get_requests();
  }, []);

  const get_requests = async () => {
    try {
      const response = await axiosInstance.post("/donor/get_requests", {
        open: true,
      });
      setRequests(response?.data.requests);
      console.log(requests);

      setFilteredRequests(response.data.requests); // Initially show all requests
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    console.log(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredRequests(requests); // If no search query, show all requests
      return;
    }

    try {
      // TextRazor API call for keyword and entity extraction
      const response = await axiosInstance.post("/textrazor", {
        query: searchQuery,
      });

      const topics = response.data.topics || [];
      const entities = response.data.entities || [];
      const categories = response.data.categories || [];
      console.log("topics:", topics);
      console.log("Entities:", entities);
      console.log("Categories:", categories);

      const filtered = requests.filter((request) => {
        const titleMatch = request.requestDetails.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        if (titleMatch) {
          console.log("the tkitlematches");
        }

        const descriptionMatch = request.requestDetails.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const addressMatch = request.requestDetails.address
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const beneficaryMatch = request.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const typeMatch = request.requestDetails.type
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const beneDesMatch = request.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        console.log("buns");

        // // Use a fallback check if no keywords or entities are found
        // const keywordMatchDescription = topics.length > 0
        //     ? topics.some(keyword => request.requestDetails.description.toLowerCase().includes(keyword.toLowerCase()))
        //     : false;  // Default to false if no keywords

        const entityMatchdescription =
          entities.length > 0
            ? entities.some((entity) =>
                request.requestDetails.description
                  .toLowerCase()
                  .includes(
                    entity.entityId.toLowerCase() ||
                      entity.matchedText.toLowerCase()
                  )
              )
            : false; // Default to false if no entities

        // const keywordMatchTitle = topics.length > 0
        //     ? topics.some(keyword => request.requestDetails.title.toLowerCase().includes(keyword.toLowerCase()))
        //     : false;  // Default to false if no keywords

        const entityMatchTitle =
          entities.length > 0
            ? entities.some((entity) =>
                request.requestDetails.title
                  .toLowerCase()
                  .includes(
                    entity.entityId.toLowerCase() ||
                      entity.matchedText.toLowerCase()
                  )
              )
            : false; // Default to false if no entities

        // const keywordMatchAddress = topics.length > 0
        //     ? topics.some(keyword => request.requestDetails.address.toLowerCase().includes(keyword.toLowerCase()))
        //     : false;  // Default to false if no keywords

        const entityMatchAddress =
          entities.length > 0
            ? entities.some((entity) =>
                request.requestDetails.address
                  .toLowerCase()
                  .includes(
                    entity.entityId.toLowerCase() ||
                      entity.matchedText.toLowerCase()
                  )
              )
            : false; // Default to false if no entities

        // const keywordMatchType = topics.length > 0
        //     ? topics.some(keyword => request.requestDetails.type.toLowerCase().includes(keyword.toLowerCase()))
        //     : false;  // Default to false if no keywords

        const entityMatchType =
          entities.length > 0
            ? entities.some((entity) =>
                request.requestDetails.type
                  .toLowerCase()
                  .includes(
                    entity.entityId.toLowerCase() ||
                      entity.matchedText.toLowerCase()
                  )
              )
            : false; // Default to false if no entities

        // const keywordMatchName = topics.length > 0
        //     ? topics.some(keyword => request.name.toLowerCase().includes(keyword.toLowerCase()))
        //     : false;  // Default to false if no keywords

        const entityMatchName =
          entities.length > 0
            ? entities.some((entity) =>
                request.name
                  .toLowerCase()
                  .includes(
                    entity.entityId.toLowerCase() ||
                      entity.matchedText.toLowerCase()
                  )
              )
            : false; // Default to false if no entities
        //
        // const keywordMatchBeneDes = topics.length > 0
        //     ? topics.some(keyword => request.description.toLowerCase().includes(keyword.toLowerCase()))
        //     : false;  // Default to false if no keywords

        const entityMatchBeneDes =
          entities.length > 0
            ? entities.some((entity) =>
                request.description
                  .toLowerCase()
                  .includes(
                    entity.entityId.toLowerCase() ||
                      entity.matchedText.toLowerCase()
                  )
              )
            : false; // Default to false if no entities

        return (
          titleMatch ||
          descriptionMatch ||
          entityMatchdescription ||
          beneficaryMatch ||
          typeMatch ||
          entityMatchTitle ||
          entityMatchTitle ||
          entityMatchType ||
          entityMatchName ||
          beneDesMatch ||
          entityMatchBeneDes ||
          addressMatch ||
          entityMatchAddress
        );
        // keywordMatchDescription || keywordMatchTitle || keywordMatchType || keywordMatchName || keywordMatchBeneDes || keywordMatchAddress
      });

      setFilteredRequests(filtered); // Update filtered requests
      console.log(filtered);
    } catch (error) {
      console.error("Error with TextRazor API:", error);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Sidebar3 />
      <div style={{ flex: "1" }}>
        <Navbar2 />
        <Container style={{ marginTop: "100px" }}>
          <Header
            as="h2"
            style={{ marginBottom: "50px" }}
            className="page-header"
          >
            Open Requests
          </Header>

          <Grid centered stackable columns={3}>
            {filteredRequests.map((request, index) => (
              <Grid.Column key={index}>
                <OpenRequest request={request} />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      </div>
      <Donatenow />

      <div className="fixed-search-box">
        <Form onSubmit={handleSearch}>
          <Form.Field>
            <label>Description</label>
            <textarea
              placeholder="Type your description here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              rows={6}
              style={{ width: "100%" }}
            />
          </Form.Field>
          <Button primary type="submit">
            Search
          </Button>
          <br />
          <small style={{ color: "grey", marginTop: "30px" }}>powered by</small>
          <img
            style={{ height: "30px", position: "absolute" }}
            src="https://assets.browserlondon.com/wp-content/uploads/2019/03/TextRazor-logo-on-white.jpg"
          />
        </Form>
      </div>
    </div>
  );
}

export default OpenRequestList;
