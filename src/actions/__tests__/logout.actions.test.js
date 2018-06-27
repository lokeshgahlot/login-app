
import {logout} from "../logout.actions";

describe("logout.actions", () => {  
  it ("logout()", () => { 
    expect(logout()).toMatchSnapshot();
  });
});