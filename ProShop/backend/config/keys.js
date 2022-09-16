import { Validator } from "node-input-validator";
import { failed, checkValidation } from "./validator.js";

export const authenticateHeader = async (req, res, next) => {
  const v = new Validator(req.headers, {
    secret_key: "required|string",
    publish_key: "required|string",
  });

  let errorsResponse = await checkValidation(v);

  if (errorsResponse) {
    return failed(res, errorsResponse);
  }
  if (
    req.headers.secret_key !==
      "sk_JJ8voENYTUv8W96IpItK7JrEFEgAV6VPWSRYuJL7fDBHQUdE0EpVJjGUy+6Y3Slq4dmKmg==" ||
    req.headers.publish_key !==
      "pk_G+uNOVb5C0u4N6eFLvtKC4t9ovydQtt7yCaNT0VmWcJDSVBpDY5iWCypryftSqRMkLl9e2E="
  ) {
    return failed(res, "Key not matched!");
  }
  next();
};
