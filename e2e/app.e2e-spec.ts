import { UnicomTestPage } from './app.po';

describe('unicom-test App', () => {
  let page: UnicomTestPage;

  beforeEach(() => {
    page = new UnicomTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
