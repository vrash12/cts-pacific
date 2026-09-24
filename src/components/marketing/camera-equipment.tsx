import { SiteImage } from "@/components/ui/site-image";

export function CameraEquipment() {
  return (
    <section className="camera-equipment" id="camera-equipment" aria-labelledby="camera-equipment-heading">
      <div className="container">
        <div className="photo-gallery__heading">
          <div>
            <p className="eyebrow">Camera systems &amp; equipment selection</p>
            <h2 id="camera-equipment-heading">Camius camera installation.</h2>
          </div>
          <p>
            CTS Pacific installs Camius camera systems. Camera and recorder selection
            is coordinated around coverage, recording, remote viewing, and the
            requirements of each site.
          </p>
        </div>
        <div className="camera-equipment__grid">
          <article>
            <div className="camera-equipment__mark">
              <SiteImage src="/images/camera-equipment/camius.jpeg" alt="Camius — Security Redefined" width={300} height={100} sizes="260px" />
            </div>
            <div className="camera-equipment__content">
              <p className="eyebrow">Installed camera brand</p>
              <h3>Camius systems</h3>
              <p>Discuss camera locations, cabling, recorder compatibility, and viewing access as part of your CCTV installation scope.</p>
            </div>
          </article>
          <article>
            <div className="camera-equipment__mark">
              <SiteImage src="/images/camera-equipment/ai.jpeg" alt="AI illustration for model-specific camera features" width={300} height={300} sizes="120px" />
            </div>
            <div className="camera-equipment__content">
              <p className="eyebrow">Model-dependent features</p>
              <h3>AI feature selection</h3>
              <p>Ask about AI features for your selected camera and recorder models. Available detection and alert functions must be confirmed for the proposed equipment.</p>
            </div>
          </article>
          <article>
            <div className="camera-equipment__mark">
              <SiteImage src="/images/camera-equipment/ndaa.jpeg" alt="Client-supplied NDAA Compliant graphic; equipment compliance requires model-specific verification" width={588} height={330} sizes="220px" />
            </div>
            <div className="camera-equipment__content">
              <p className="eyebrow">Project-specific requirements</p>
              <h3>NDAA documentation</h3>
              <p>Where NDAA compliance is required, confirm the selected camera and recorder models against manufacturer documentation before procurement. This graphic is not a company certification.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
