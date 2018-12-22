function hasPermission(user, permissionsNeeded) {
  const matchesPermissions = user.permissions.some(permissionTheyHave =>
    permissionsNeeded.some(p => p === permissionTheyHave)
  );
  if (!matchesPermissions) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
  }
}

exports.hasPermission = hasPermission;
