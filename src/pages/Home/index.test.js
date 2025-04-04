import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

//added tests of the differents elements of the home page
const mockEventList = jest.fn();
jest.mock("../../containers/Events", () => (props) => {
  mockEventList(props);
  return <mock-event role="event-list"/>
})

const mockPeopleList = jest.fn();
jest.mock("../../components/PeopleCard", () => (props) =>{
  mockPeopleList(props);
  return <mock-people role="people-list"/>
})

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render (<Home />);
    expect(mockEventList).toHaveBeenCalledTimes(1);
  })
  it("a list a people is displayed", () => {
    render (<Home />);
    expect(mockPeopleList).toHaveBeenCalledTimes(6);
  })
  it("a footer is displayed", () => {
    render (<Home />);
    screen.getByTestId("prestation-testid");
    screen.getByTestId("contact-testid");
    screen.getByTestId("description-testid");
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
