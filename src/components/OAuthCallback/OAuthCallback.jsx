import useOAuthCallback from "../../hooks/useOAuthCallback";

const OAuthCallback = () => {
    useOAuthCallback();
    return <div className="loading">Loading...</div>
};

export default OAuthCallback;
