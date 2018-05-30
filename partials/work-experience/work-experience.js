export default class WorkExperiencePartial {
  constructor(config) {
    this.config = config || {};
    this.showMoreLinkClass = 'work-experience__show-more';
    this.hiddenClass = 'work-experience__job--hidden';
    this.init();
  }

  init() {
    const showMoreLink =
      document.querySelector(`.${ this.showMoreLinkClass }`);

    showMoreLink.addEventListener('click', (clickEvent) => {
      clickEvent.preventDefault();
      const hiddenJobs = document.querySelectorAll(`.${ this.hiddenClass }`);
      hiddenJobs.forEach((job) => {
        job.classList.remove(this.hiddenClass);
      });
      showMoreLink.remove();
    });
  }
}

