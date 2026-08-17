function BackgroundSection() {
    return (
        <div>
            <div className="flex flex-col mt-10 items-center justify-center text-black">
                <h1 className="
                    max-w-4xl
                    text-center
                    font-mono
                    font-black
                    text-5xl
                    uppercase
                    tracking-widest
                    leading-tight
                    mt-20
                ">
                    Proud Cambodian brand,
                    ready to make a difference
                    in clothing
                </h1>
            </div>
            <div className="bg-gray-500">
            <div className="container">
                <footer className="py-5">
                    <div className="row">
                        <div className="col-6 col-md-2 mb-3"><h5>Section</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><a href="#"
                                                                 className="nav-link p-0 text-body-secondary">Home</a>
                                </li>
                                <li className="nav-item mb-2"><a href="#"
                                                                 className="nav-link p-0 text-body-secondary">Features</a>
                                </li>
                                <li className="nav-item mb-2"><a href="#"
                                                                 className="nav-link p-0 text-body-secondary">Pricing</a>
                                </li>
                                <li className="nav-item mb-2"><a href="#"
                                                                 className="nav-link p-0 text-body-secondary">FAQs</a>
                                </li>
                                <li className="nav-item mb-2"><a href="#"
                                                                 className="nav-link p-0 text-body-secondary">About</a>
                                </li>
                            </ul>
                        </div>
                            <div className="col-6 col-md-2 mb-3"><h5>Section</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">Home</a>
                                    </li>
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">Features</a>
                                    </li>
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">Pricing</a>
                                    </li>
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">FAQs</a>
                                    </li>
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">About</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-2 mb-3"><h5>Section</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">Home</a>
                                    </li>
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">Features</a>
                                    </li>
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">Pricing</a>
                                    </li>
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">FAQs</a>
                                    </li>
                                    <li className="nav-item mb-2"><a href="#"
                                                                     className="nav-link p-0 text-body-secondary">About</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-5 offset-md-1 mb-3">
                                <form><h5>Subscribe to our newsletter</h5> <p>Monthly digest of what's new and exciting from
                                    us.</p>
                                    <div className="d-flex flex-column flex-sm-row w-100 gap-2"><label htmlFor="newsletter1"
                                                                                                       className="visually-hidden">Email
                                        address</label> <input id="newsletter1" type="email" className="form-control"
                                                               placeholder="Email address"/>
                                        <button className="btn btn-primary" type="button">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top"><p>©
                            2026 Company, Inc. All rights reserved.</p>
                            <ul className="list-unstyled d-flex">
                                <li className="ms-3"><a className="link-body-emphasis" href="#" aria-label="Instagram">
                                    <svg className="bi" width="24" height="24">
                                        <use xlink:href="#instagram"></use>
                                    </svg>
                                </a></li>
                                <li className="ms-3"><a className="link-body-emphasis" href="#" aria-label="Facebook">
                                    <svg className="bi" width="24" height="24" aria-hidden="true">
                                        <use xlink:href="#facebook"></use>
                                    </svg>
                                </a></li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default BackgroundSection