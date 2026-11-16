/**
 * The red glows behind every page. They are painted onto the page itself
 * (so they scroll with the content) and drift slowly around like blobs in
 * a lava lamp: each one wanders, stretches and fades on its own long loop.
 * All the motion is CSS (see .page-glow in index.css). Everything sits
 * behind the content, so opaque blocks such as the home hero video simply
 * cover it.
 */
const PageGlow = () => (
  <div className="page-glow" aria-hidden="true">
    <div className="page-glow__blob page-glow__blob--1" />
    <div className="page-glow__blob page-glow__blob--2" />
    <div className="page-glow__blob page-glow__blob--3" />
    <div className="page-glow__blob page-glow__blob--4" />
    <div className="page-glow__blob page-glow__blob--5" />
    <div className="page-glow__blob page-glow__blob--6" />
  </div>
);

export default PageGlow;
