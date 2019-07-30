/* eslint-disable prefer-promise-reject-errors */
import axios from "axios";
/* eslint-disable camelcase */
import {shallow} from "enzyme";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import renderer from "react-test-renderer";

import getConfig from "../../utils/get-config";
import Registration from "./registration";

jest.mock("axios");

const defaultConfig = getConfig("default");
const createTestProps = props => {
  return {
    language: "en",
    orgSlug: "default",
    registration: defaultConfig.components.registration_form,
    privacyPolicy: defaultConfig.privacy_policy,
    termsAndConditions: defaultConfig.terms_and_conditions,
    ...props,
  };
};

describe("<Registration /> rendering", () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it("should render correctly", () => {
    props = createTestProps();
    const component = renderer
      .create(
        <Router>
          <Registration {...props} />
        </Router>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});

describe("<Registration /> interactions", () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<Registration {...props} />);
  });
  it("should change state values when handleChange function is invoked", () => {
    wrapper
      .find("#owisp-registration-username")
      .simulate("change", {target: {value: "test username", name: "username"}});
    expect(wrapper.state("username")).toEqual("test username");
    wrapper
      .find("#owisp-registration-email")
      .simulate("change", {target: {value: "test email", name: "email"}});
    expect(wrapper.state("email")).toEqual("test email");
    wrapper
      .find("#owisp-registration-password")
      .simulate("change", {target: {value: "testpassword", name: "password1"}});
    expect(wrapper.state("password1")).toEqual("testpassword");
    wrapper
      .find("#owisp-registration-password-confirm")
      .simulate("change", {target: {value: "testpassword", name: "password2"}});
    expect(wrapper.state("password2")).toEqual("testpassword");
  });

  it("should execute handleSubmit correctly when form is submitted", () => {
    axios
      .mockImplementationOnce(() => {
        return Promise.reject({
          response: {
            data: {
              username: "username error",
              email: "email error",
              password1: "password1 error",
              password2: "password2 error",
            },
          },
        });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve();
      });
    wrapper.setState({
      password1: "wrong password",
      password2: "wrong password1",
    });
    const event = {preventDefault: () => {}};
    wrapper.instance().handleSubmit(event);
    expect(
      wrapper.update().find(".owisp-registration-error-confirm"),
    ).toHaveLength(1);
    wrapper.setState({
      password1: "password",
      password2: "password",
    });
    return wrapper
      .instance()
      .handleSubmit(event)
      .then(() => {
        expect(wrapper.instance().state.errors).toEqual({
          username: "username error",
          email: "email error",
          password1: "password1 error",
          password2: "password2 error",
        });
        expect(wrapper.find(".owisp-registration-error")).toHaveLength(4);
      })
      .then(() => {
        return wrapper
          .instance()
          .handleSubmit(event)
          .then(() => {
            expect(wrapper.instance().state.errors).toEqual({});
            expect(wrapper.instance().state.success).toEqual(true);
            expect(
              wrapper.find(".owisp-registration-form.success"),
            ).toHaveLength(1);
          });
      });
  });
});
