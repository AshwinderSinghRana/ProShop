import axios from "axios";

export const httpGet = axios.create({
  baseURL: "http://localhost:1221",
});
export const httpPost = axios.create({
  baseURL: "http://localhost:1221",
  headers: {
    secret_key:
      "sk_JJ8voENYTUv8W96IpItK7JrEFEgAV6VPWSRYuJL7fDBHQUdE0EpVJjGUy+6Y3Slq4dmKmg==",
    publish_key:
      "pk_G+uNOVb5C0u4N6eFLvtKC4t9ovydQtt7yCaNT0VmWcJDSVBpDY5iWCypryftSqRMkLl9e2E=",
    "Content-Type": "application/json",
  },
});
