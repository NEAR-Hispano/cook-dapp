@nearBindgen
class Image {
  name: string;
  cid: string;
  url: string;

  constructor(name: string, cid: string, url: string) {
    this.name = name;
    this.cid = cid;
    this.url = url;
  }
}

export default Image;
