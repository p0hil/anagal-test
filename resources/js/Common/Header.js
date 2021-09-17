import {InertiaLink, usePage} from '@inertiajs/inertia-react';

export default () => {
  const { auth } = usePage().props;

  return (
    <header id="header">
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contactinfo">
                <ul className="nav nav-pills">
                  <li><a href="#"><i className="fa fa-phone"></i> +972 53 348 16 30</a></li>
                  <li><a href="#"><i className="fa fa-envelope"></i> example@mail.com</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="social-icons pull-right">
                <ul className="nav navbar-nav">
                  <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                  <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                  <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-middle">
        <div className="container">
          <div className="row">
            <div className="col-md-4 clearfix">


            </div>
            <div className="col-md-8 clearfix">
              <div className="shop-menu clearfix pull-right">
                <ul className="nav navbar-nav">
                  <li>
                    <InertiaLink href={route('cart')}>
                      <i className="fa fa-shopping-cart"></i> Cart
                    </InertiaLink>
                  </li>
                  <li>
                    {
                      auth.user
                        ? (
                          <div>
                            <span>Welcome {auth.user.name}</span>
                            <InertiaLink href={route('logout')} method="post" as="button" className="ml-8">
                              Logout
                            </InertiaLink>
                          </div>
                        )
                        : (
                          <div>
                            <InertiaLink href={route('login')}>
                              <i className="fa fa-lock"></i> Login
                            </InertiaLink>
                          </div>
                        )
                    }

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
