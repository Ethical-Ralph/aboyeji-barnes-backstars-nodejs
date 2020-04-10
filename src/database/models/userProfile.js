/* eslint-disable no-unused-vars */
export default (sequelize, DataTypes) => {
  const userProfile = sequelize.define(
    'UserProfile',
    {
      userId: DataTypes.INTEGER,
      birthDate: DataTypes.DATE,
      department: DataTypes.STRING,
      phoneNumber: DataTypes.NUMERIC,
      language: DataTypes.STRING,
      currency: DataTypes.STRING,
      gender: DataTypes.STRING,
      location: DataTypes.STRING,
      passportName: DataTypes.STRING,
      passportNumber: DataTypes.STRING
    },
    {}
  );
  userProfile.associate = (models) => {
    // associations can be defined here
  };
  return userProfile;
};
