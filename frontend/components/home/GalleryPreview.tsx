import * as React from "react"

export function GalleryPreview() {
  return (
    <section className="py-24 bg-accent/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary mb-4 font-heading">Life at SZR College</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body">
            Explore our vibrant campus, state-of-the-art facilities, and the diverse community that makes us unique.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <div className="row-span-2 col-span-2 overflow-hidden rounded-[12px] group">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="Large college library with students studying at long tables surrounded by floor-to-ceiling bookshelves" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4wmhEPnXcgvLtQ3rc7BgFfSLxpioYlZfdQ_wMEwBmMXG4akhfockDqMadbt3DgCtcw3y6sfmD5SWdYRAdQ6S3ixuZlL-4fod_D7H7UdONoygFqVMNlb-Rd7ZuzQqGR48o3q3aMmm0mQYJcvYKP2PSjMgmU21o3OPvArRRKKCFT1m5_-X3GiY64VbiJMFs0jK6AHvP2xO48qz1oNJDr_ITAhz48SLTowUNXfA8SlIheA_pqQpUPolI2PTnMaXkz7vFb-i33tq-3fk"
            />
          </div>
          <div className="overflow-hidden rounded-[12px] group">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="Students working in a modern chemistry lab with glass equipment and safety gear" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFaj6-4wOP3px3vaW7c2D4ogC_YB0xjez6wEDmlXJpz-1lm7J_rN4-Vr03sSSP7JsJe99DdulYjTjI3d9sn1egpI99kAyKSAHHV2yXctW8bs0qlVaA-SLoF14zICGTP6IMjP7Ewdt3m4X1dcHF6AMtbfeMxesXYs6-2kwLoUIY7RpDNO1d_-XLFP-htbRGHhgpx_PHA5S7R3o5Q0BeZFPpjcwdtRdUGxNoLe87zvB0Y3aRAOXW5WY4bM4tj9igBeJD42Pa74-O44M"
            />
          </div>
          <div className="overflow-hidden rounded-[12px] group">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="A group of diverse college students sitting on lawn talking and laughing together" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg-s9d-ohh6qdhTPuD8JNduwuic5mZ03joLGoLCEaESE82oB49ZOaUMTznv7t_qFQRyt-RJXXQ_zYiYPvU1F1UXCt4FZet7B-NXkhzfK_wS0kflyLsQVN7CydOYEUZdZnV76zEwEAFK9WKtAS4FNEezr4_XSJ9ZOYIvvTH6H7DFwVJDdnRQLW6Ywom5wJnBIWJh3gC__Hx-U9xHZ3X2MvyqHBplSk2gm84_W2Xyot4nYHJlNKmCmLrj5gCNcewp8tdyqtm7rbfKlM"
            />
          </div>
          <div className="col-span-2 overflow-hidden rounded-[12px] group">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="Aerial view of college campus with modern architecture and connected walkways between buildings" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCUfDjHWIZEy63pAcXu-saWjgyXwK0eiheGYLu1BZj43VZTFxPxYNqlxL-DurnQpGPiKr9eZbKOzLzvV5HdpCeOpQ5eI3CqiHndWpzM5Qezg5TerokRDh545EUjQ1lLMj1AFRumPhnVIPS6RtcwtiUz2_36V4AyI4_2VVC1aa7vyUI2ZSqKH-RJ_vjlMS9DSJaqKvgYIotohqDASb_wQ4RY4MdsR6Sqc8bNd49C_aA33dv-ul5cKhIQl3kvlVsJqBi9mSA4AyzlXQ"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
