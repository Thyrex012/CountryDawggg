import countryDawgggVid from '../../assets/countrydawggg-vid.MP4';

function CountryDawgggVid() {
    const welcomeMessage = 'Welcome to the future with CountryDawggg ✦ ';

    return <div>
        <video className="w-full" src={countryDawgggVid} autoPlay muted loop playsInline></video>
        <div className="future-marquee" aria-label="Welcome to the future with CountryDawggg">
            <div className="future-marquee__track">
                <span>{welcomeMessage.repeat(5)}</span>
                <span aria-hidden="true">{welcomeMessage.repeat(5)}</span>
            </div>
        </div>
    </div>
}

export default CountryDawgggVid
