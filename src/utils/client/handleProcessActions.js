const { exec } = require("child_process");

async function getPing(host) {
  return new Promise((resolve, reject) => {
    exec(`ping -c 4 ${host}`, (error, stdout) => {
      if (error) {
        if (error.code == 1) {
          console.error("Connection to host failed while pinging.");

          resolve(1);
        } else if (error.code == 2) {
          console.error("Unable to retrieve ip while pinging.");

          resolve(2);
        } else {
          console.error("Unknown error while pinging: ", error);

          reject(error);
        }
        return;
      }

      resolve(stdout);
    });
  });
}

async function postPM2(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error while executing PM2 command: ", error.message);

        reject(error);
        return;
      }

      if (stderr) {
        console.error("PM2 command error: ", stderr);

        reject(new Error(stderr));
        return;
      }

      resolve(stdout);
    });
  });
}

module.exports = {
  getPing,
  postPM2,
};
