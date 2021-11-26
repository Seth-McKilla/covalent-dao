import { useCallback, useEffect, useContext } from "react";
import { Context } from "../../context";
import web3Modal from "../../web3";
import { providers } from "ethers";

// Mui
import { default as MuiAppBar } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AppBar() {
  const {
    state: { provider, web3Provider, address, chainId },
    dispatch,
  } = useContext(Context);

  const connect = useCallback(
    async function () {
      const provider = await web3Modal.connect();

      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      const network = await web3Provider.getNetwork();

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });
    },
    [dispatch]
  );

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [dispatch, provider]
  );

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connect();
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [dispatch, provider, disconnect]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            DAOlytics
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={connect}
          >
            Connect
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
