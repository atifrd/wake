import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSession, UserProfile, AuthenticatedUser, UserRole } from './user.models';
import { Component, Pipe, PipeTransform, Directive } from '@angular/core';
import { Farm } from './farm.models';

describe('UserSession without params', () => {
  let component: UserSession;

  beforeEach(async(() => {
    component = new UserSession();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

describe('UserSession with no params', () => {
  let component: UserSession;
  
  beforeEach(async(() => {
    component = new UserSession();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have null accessToken', () => {
    expect(component.accessToken).toBeNull();
  });

  it('should have null refreshToken', () => {
    expect(component.refreshToken).toBeNull();
  });

  it('should have null farm', () => {
    expect(component.farm).toBeNull();
  });

  it('should have null user', () => {
    expect(component.user).toBeNull();
  });
});

describe('UserSession with typed payload', () => {
  let component: UserSession;
  let payload: UserSession;
  let farmId: "12323453456";

  beforeEach(async(() => {
    payload = new UserSession();
    payload.accessToken = "abcdefg";
    payload.refreshToken = "hijklmnop";
    let user = new AuthenticatedUser();
    user.firstName = "bob";
    user.lastName = "smith";
    user.roles = new Array<UserRole>();
    let role = new UserRole();
    role.farmId = farmId;
    role.role = "administrator";
    user.roles.push(role);
    payload.user = user;
    let farm = new Farm();
    farm.id = farmId;
    farm.farmName = "old mcdonalds";
    payload.farm = farm;
    component = new UserSession(payload);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access token', () => {
    expect(component.accessToken).toBeTruthy();
    expect(component.accessToken).toBe("abcdefg");
  });

  it('should have refresh token', () => {
    expect(component.refreshToken).toBeTruthy();
    expect(component.refreshToken).toBe("hijklmnop");
  });

  it('should have user properties', () => {
    expect(component.user).toBeTruthy();
    expect(component.user.firstName).toBe("bob");
    expect(component.user.lastName).toBe("smith");
  });

  it('should have user role', () => {
    expect(component.user.roles).toBeTruthy();
    expect(component.user.roles.length === 1);
    expect(component.user.roles[0]).toBeTruthy();
    expect(component.user.roles[0].farmId).toBe(farmId);
    expect(component.user.roles[0].role).toBe("administrator");
  });

  it('should have farm', () => {
    expect(component.farm).toBeTruthy();
    expect(component.farm.id).toBe(farmId);
    expect(component.farm.farmName).toBe("old mcdonalds");
  });
});
  
  describe('UserSession with typed payload', () => {
    let component: UserSession;
    let payload: UserSession;
    let farmId: "12323453456";
  
    beforeEach(async(() => {
      payload = new UserSession();
      payload.accessToken = "abcdefg";
      payload.refreshToken = "hijklmnop";
      let user = new AuthenticatedUser();
      user.firstName = "bob";
      user.lastName = "smith";
      user.roles = new Array<UserRole>();
      let role = new UserRole();
      role.farmId = farmId;
      role.role = "administrator";
      user.roles.push(role);
      payload.user = user;
      let farm = new Farm();
      farm.id = farmId;
      farm.farmName = "old mcdonalds";
      payload.farm = farm;
      component = new UserSession(payload);
    }));
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should have the accessToken', () => {
      expect(component.accessToken).toBeTruthy();
      expect(component.accessToken).toBe("abcdefg");

    });
  
    it('should have the refreshToken', () => {
      expect(component.refreshToken).toBeTruthy();
      expect(component.refreshToken).toBe("hijklmnop");

    });
  
    it('should have the user', () => {
      expect(component.user).toBeTruthy();
      expect(component.user.firstName).toBe("bob");
      expect(component.user.lastName).toBe("smith");

    });
  
    it('should have the user role', () => {
      expect(component.user.roles).toBeTruthy();
      expect(component.user.roles.length === 1);
      expect(component.user.roles[0]).toBeTruthy();
      expect(component.user.roles[0].farmId).toBe(farmId);
      expect(component.user.roles[0].role).toBe("administrator");

    });
  
    it('should have the farm', () => {
      expect(component.farm).toBeTruthy();
      expect(component.farm.id).toBe(farmId);
      expect(component.farm.farmName).toBe("old mcdonalds");
    });
});

describe('UserSession with json payload', () => {
  let component: UserSession;
  let payload: any;
  
  beforeEach(async(() => {
    payload = { 
      accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik56YmNhUWhxQkdYcUF5M2hHVks2NkM2X2tEOCIsImtpZCI6Ik56YmNhUWhxQkdYcUF5M2hHVks2NkM2X2tEOCJ9.eyJpc3MiOiJodHRwczovL3VhdC1pZC5mZWVkdG9vbHMuY29tLmF1IiwiYXVkIjoiaHR0cHM6Ly91YXQtaWQuZmVlZHRvb2xzLmNvbS5hdS9yZXNvdXJjZXMiLCJleHAiOjE1NTQzODk3MTUsIm5iZiI6MTU1NDM1MzcxNSwiY2xpZW50X2lkIjoiZmVlZHRvb2xzLWFwaSIsInNjb3BlIjpbIm9mZmxpbmVfYWNjZXNzIiwib3BlbmlkIiwicHJvZmlsZSJdLCJzdWIiOiIyYmNiNzNhNi05ZWM2LTRkZWUtYWQ4My1lNjAzY2I1ZWE1NmYiLCJhdXRoX3RpbWUiOjE1NTQzNTM3MTUsImlkcCI6Imlkc3J2IiwiYW1yIjpbInBhc3N3b3JkIl19.bQWvfmow8Gt_PaI-57NUgs5g2HPj3Z2A1mzMnfcJeHS6QiK6mT3lZVn8590CCH5y5pLOon6LCprkDxIii3F7ofaHot1PYJNVh9wuNOa6Oov_xdSzEygD_ke3JnQVphnImkkH3u6GkjLFTvAlNfqUSyKvKXQ4i5M7zyqvxdUcxeoqWkioJi7ohi1siC8sUGl-_XRJgSXesOU99ID4teWFCzuBEgf8mO0WtbtGJncYV8rjEwkKOiqDDE2JIINgqrKV1vY2HyyDRpmWjN0unwprK-kvP8CmpY6tuplA-tzdae9wQGAIhZSl8aVJ-Jy86oMCkXXxBNGPJx9ZIbEyERNREQ", refreshToken: "cd85882624a120d80d7239eedf573540", 
      user: { 
        roles: [
          { 
            role: "administrator",
            farmId: "53d0625b-75f5-408e-9c92-076f00763e9a" 
          }
        ],
        firstName: "Hamish",
        lastName: "Bobsow",
        timezone: "Australia/Melbourne"
      },
      farm: 
      { 
        id: "53d0625b-75f5-408e-9c92-076f00763e9a",
        farmName: "Telopea", 
        daysSinceFeedplanUpdate: 0, 
        daysSinceLastStocktake: 0, 
        daysUntilFeedRunout: 0
      }
    };

    component = new UserSession(payload); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the access token', () => {
    expect(component.accessToken).toBeTruthy();
    expect(component.accessToken).toBe("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik56YmNhUWhxQkdYcUF5M2hHVks2NkM2X2tEOCIsImtpZCI6Ik56YmNhUWhxQkdYcUF5M2hHVks2NkM2X2tEOCJ9.eyJpc3MiOiJodHRwczovL3VhdC1pZC5mZWVkdG9vbHMuY29tLmF1IiwiYXVkIjoiaHR0cHM6Ly91YXQtaWQuZmVlZHRvb2xzLmNvbS5hdS9yZXNvdXJjZXMiLCJleHAiOjE1NTQzODk3MTUsIm5iZiI6MTU1NDM1MzcxNSwiY2xpZW50X2lkIjoiZmVlZHRvb2xzLWFwaSIsInNjb3BlIjpbIm9mZmxpbmVfYWNjZXNzIiwib3BlbmlkIiwicHJvZmlsZSJdLCJzdWIiOiIyYmNiNzNhNi05ZWM2LTRkZWUtYWQ4My1lNjAzY2I1ZWE1NmYiLCJhdXRoX3RpbWUiOjE1NTQzNTM3MTUsImlkcCI6Imlkc3J2IiwiYW1yIjpbInBhc3N3b3JkIl19.bQWvfmow8Gt_PaI-57NUgs5g2HPj3Z2A1mzMnfcJeHS6QiK6mT3lZVn8590CCH5y5pLOon6LCprkDxIii3F7ofaHot1PYJNVh9wuNOa6Oov_xdSzEygD_ke3JnQVphnImkkH3u6GkjLFTvAlNfqUSyKvKXQ4i5M7zyqvxdUcxeoqWkioJi7ohi1siC8sUGl-_XRJgSXesOU99ID4teWFCzuBEgf8mO0WtbtGJncYV8rjEwkKOiqDDE2JIINgqrKV1vY2HyyDRpmWjN0unwprK-kvP8CmpY6tuplA-tzdae9wQGAIhZSl8aVJ-Jy86oMCkXXxBNGPJx9ZIbEyERNREQ");
  });

  it('should have the refresh  token', () => {
    expect(component.refreshToken).toBeTruthy();
    expect(component.refreshToken).toBe("cd85882624a120d80d7239eedf573540");
  });
  
  it('should have the user', () => {
    expect(component.user).toBeTruthy();
    expect(component.user.firstName).toBe("Hamish");
    expect(component.user.lastName).toBe("Bobsow");
  });
  
  it('should have the user roles', () => {
    expect(component.user.roles).toBeTruthy();
    expect(component.user.roles.length === 1);
    expect(component.user.roles[0]).toBeTruthy();
    expect(component.user.roles[0].farmId).toBe("53d0625b-75f5-408e-9c92-076f00763e9a");
    expect(component.user.roles[0].role).toBe("administrator");
  });
  
  it('should have the farm', () => {
    expect(component.farm).toBeTruthy();
    expect(component.farm.id).toBe("53d0625b-75f5-408e-9c92-076f00763e9a");
    expect(component.farm.farmName).toBe("Telopea");
  });
});
