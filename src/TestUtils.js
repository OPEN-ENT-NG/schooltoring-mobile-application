import sinon from "sinon";

export function expectMissingProp(prop, component) {
  sinon.assert.calledWithMatch(
    console.error,
    new RegExp(
      `Required prop \`${prop}\` was not specified in \`${component}\``
    )
  );
}

export function replaceError() {
  beforeEach(() => {
    sinon.stub(console, "error");
  });

  afterEach(() => {
    console.error.restore();
  });
}
