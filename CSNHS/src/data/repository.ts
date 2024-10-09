import { RepoFile } from "../types/RepoFile";

//!This file will contain all necesssary hardcoded data for Repository-related component files (/pages/RepositoryFile.tsx)

//*Used as base content and will be shown if nothing is found, thus to be called 'ErrorContent'
export const ErrorContent: RepoFile = {
    name: "Error",
    path: "",
    sha: "",
    size: 999,
    url: "",
    html_url: "",
    git_url: "",
    download_url: null,
    type: "file",
    content:
      "RXJyb3IgZmluZGluZyB0aGlzIGZpbGUncyBpbmZvcm1hdGlvbi4gUGxlYXNlIHJlbG9hZCBvciByZXBvciBwcm9ibGVtLiBUaGVyZSBtYXkgYWxzbyBiZSBhIGNoYW5jZSB0aGlzIGZpbGUgaGFzIG5vIGNvZGUu",
    encoding: "base64",
    _links: {
      self: "",
      git: "",
      html: "",
    },
  };