import React from "react";
import { mount, ReactWrapper, shallow } from "enzyme";
import { FilmForm } from "..";
import { FormType, newMovie } from "../../../constants";
import { act } from "react-dom/test-utils";
import { Movie } from "../../../redux/filmDetails/mocks";

const waitForComponentToPaint = async (wrapper: any) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};

describe("FilmForm", () => {
  let component: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  const handleCloseForm = jest.fn();
  const handleSubmitForm = jest.fn();
  const handleClearErrors = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    component = mount(
      <FilmForm
        film={newMovie}
        modalType={FormType.ADD}
        errors={{}}
        closeForm={handleCloseForm}
        submitForm={handleSubmitForm}
        clearErrors={handleClearErrors}
      />
    );
  });

  it("reset form", async () => {
    const input = component.find("input[name='title']");

    input.simulate("change", {
      target: {
        name: "title",
        value: "dwdw",
      },
    });

    component.find(".form").simulate("reset");

    await waitForComponentToPaint(component);

    expect((input.getDOMNode() as any).value).toEqual(" ");
  });

  it("should call 'handleSubmitForm' when submit", async () => {
    const component = shallow(
      <FilmForm
        film={Movie}
        modalType={FormType.ADD}
        errors={{}}
        closeForm={handleCloseForm}
        submitForm={handleSubmitForm}
        clearErrors={handleClearErrors}
      />
    );

    component.find(".form").simulate("submit");

    await waitForComponentToPaint(component);
    expect(handleSubmitForm).toHaveBeenCalled();
  });

  it("should call 'handleClearErrors'", async () => {
    const component = shallow(
      <FilmForm
        film={Movie}
        modalType={FormType.ADD}
        errors={{ title: "Error" }}
        closeForm={handleCloseForm}
        submitForm={handleSubmitForm}
        clearErrors={handleClearErrors}
      />
    );

    expect(handleClearErrors).toHaveBeenCalled();
  });

  it("should call 'handleCloseForm' when close button click", async () => {
    const close = component.find(".close");

    close.simulate("click");

    await waitForComponentToPaint(component);
    expect(handleCloseForm).toHaveBeenCalled();
  });

  it("should show error in Title field", async () => {
    const input = component.find(`input[name='title']`);

    input
      .simulate("change", {
        target: {
          name: "title",
          value: "",
        },
      })
      .simulate("blur");

    await waitForComponentToPaint(component);
    const error = component.find(".error");
    expect(error.length).toBe(1);
  });

  it("should not show error in Title field", async () => {
    const input = component.find(`input[name='title']`);

    input
      .simulate("change", {
        target: {
          name: "title",
          value: "word",
        },
      })
      .simulate("blur");

    await waitForComponentToPaint(component);
    const error = component.find(".error");
    expect(error.length).toBe(0);
  });
});
