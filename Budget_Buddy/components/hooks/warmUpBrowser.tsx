import React, { useEffect } from 'react'
import * as WebBrowser from "expo-web-browser";
 
/**
 * Custom hook to warm up the browser before performing any web browser operations.
 * It calls the `WebBrowser.warmUpAsync()` method when the component mounts and
 * `WebBrowser.coolDownAsync()` method when the component unmounts.
 */
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};