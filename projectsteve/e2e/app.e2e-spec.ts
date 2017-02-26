import { ProjectstevePage } from './app.po';

describe('projectsteve App', function() {
  let page: ProjectstevePage;

  beforeEach(() => {
    page = new ProjectstevePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
