import { Subject } from "rxjs";

class ChildDataService {
  constructor() {
    this.next$ = new Subject();
    this.commentNext$ = new Subject();
  }
}
export default new ChildDataService();
