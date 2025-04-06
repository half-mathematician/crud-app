const passwordResetTemplate = (name, resetLink) => `
<!DOCTYPE html>
<html lang="en">
  <head>
     <style>
      .email-container {
        background-color: #333333;
        border-radius: 20px;
      }
    </style>
  </head>
  <body>
    <div>
      <h2>Password reset request</h2>
      <span>Hi ${name}</span>
      <p>Click on below link to reset password</p>
      <a href="${resetLink}">Reset Password</a>
    </div>
  </body>
</html>
`;

module.exports = { passwordResetTemplate };
