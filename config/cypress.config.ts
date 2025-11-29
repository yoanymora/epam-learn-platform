import { defineConfig } from "cypress";

export default defineConfig({
	env: {
		baseUrl: "https://learn.epam.com/start",
		logInUrl:
			"https://learn.epam.com/api/signin?redirectUrl=https%3A%2F%2Flearn.epam.com%2Fstart",
		logInWithGoogleUrl:
			"https://accounts.google.com/v3/signin/identifier?opparams=%253F&dsh=S-721042388%3A1764376094649328&client_id=28302459813-vq689q6sp2a5hr1h3lu03eu7la4b5pk5.apps.googleusercontent.com&nonce=4PEIX6Zml8Oa8dy6rzPRhg&o2v=2&redirect_uri=https%3A%2F%2Faccess.epam.com%2Fauth%2Frealms%2Fplusx%2Fbroker%2Fgoogle%2Fendpoint&response_type=code&scope=openid+profile+email&service=lso&state=NuxVM36HVF4bU1aDhdATy4YOsBIBkr13leTkSqqAszo.HOQJSbrsZak.xpBTvQb5TXGQ_HLaO0h9FQ.eyJydSI6Imh0dHBzOi8vbGVhcm4uZXBhbS5jb20vbG9naW4vb2F1dGgyL2NvZGUvZXBhbSIsInJ0IjoiY29kZSIsInN0IjoiOFdiQ0owNS1JZmhyUDF6V3NKT3RjbEZ1VWhBWS1TMWpVOGE3ZTYtdlU3RWFvbmVYbDhkTndWOG4weFFQYmlMS3ZtZjdmTjZvMFg2d01MR2NVa1QzODB1X3ZES3FaV3huV0hVUDJsMTRGU2hQUDU5cHpPNnNOYnBJX1BOb2Q5anB1QzRDaGNmNU9BRT0ifQ&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hAMakEu2_yj7G2a5jf0emW1RALxboDdSXpDZKG44-7zPqIyl_AUZhKxOxSTXClZbLjlk_-3l5rJOQ2_ACxCO9qsiYj_1js79YGcJTzFH2iC4_mS1eGrXi8vZUtVCq_HphL_wtr2kjSa5bD9K3eQqf4uq_uG8fIPI_sk_43_9AwVptT-WMFsGcRDbqOV4HCh3nqV6Dg-XyiyQZWB7QhgMex_rai232Iro0un1B-ttpStcCRCWVhBtfscS9U1uMyIEPgnk4iisq72haiIVSalUbzZ3Fdh7WLXT33I6ydv7A3-YbLBO8CtdTsMnExxsLDiZ5xeAPioB6Uu5zOxCTFZO78PfXgv7SjQHfWJQTh8xnIiuVvgMbc1mJB7YtnTSDeyRJ-iB3JyTS83-EQgGjsC78_3_ik5fEXYoZiP_pAZ6qmF0Z9TNtnnvkUCweczOzqFmusBKZAL-AD-HVbzZQZ47MdOI1my6jg%26flowName%3DGeneralOAuthFlow%26as%3DS-721042388%253A1764376094649328%26client_id%3D28302459813-vq689q6sp2a5hr1h3lu03eu7la4b5pk5.apps.googleusercontent.com%26requestPath%3D%252Fsignin%252Foauth%252Fconsent%23&app_domain=https%3A%2F%2Faccess.epam.com&rart=ANgoxceWOwA2aD-ynibPAb3-kpK4pC8gZ4_4nkCfm8if-sH29_sB-cSUFmjCi9FN2jl7KStIWNesRW7OrDzQDGc2IJAEJcNDjIOHibPAFRf3m-qnKCnr-O0",
	},
	e2e: {
		specPattern: "cypress/tests/**/*.spec.ts",
		setupNodeEvents(on, config) {},
	},
});
