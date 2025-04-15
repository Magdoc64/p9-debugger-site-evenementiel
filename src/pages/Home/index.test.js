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
jest.mock("../../components/PeopleCard", () => (imageSrc, name, position) =>{
  mockPeopleList(imageSrc, name, position);
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
    expect(mockPeopleList.mock.calls[0][0].imageSrc).toBe("/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png");
    expect(mockPeopleList.mock.calls[1][0].imageSrc).toBe("/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png");
    expect(mockPeopleList.mock.calls[2][0].imageSrc).toBe("/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png");
    expect(mockPeopleList.mock.calls[3][0].imageSrc).toBe("/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png");
    expect(mockPeopleList.mock.calls[4][0].imageSrc).toBe("/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png");
    expect(mockPeopleList.mock.calls[5][0].imageSrc).toBe("/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png");
  })
  it("a footer is displayed", () => {
    render (<Home />);
    expect(screen.getByTestId("prestation-testid")).toBeInTheDocument();
    expect(screen.getByTestId("contact-testid")).toBeInTheDocument();
    expect(screen.getByTestId("description-testid")).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
