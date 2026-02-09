import useOAuthCallback from "../../hooks/useOAuthCallback";

const OAuthCallback = () => {
    useOAuthCallback();
    return <p>loading...</p>;;
};

export default OAuthCallback;
