import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import twemoji from 'twemoji';
import { DataService } from '../data.service';
@Component({
  selector: 'app-my-web-component',
  templateUrl: './my-web-component.component.html',
  styleUrls: ['./my-web-component.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MyWebComponentComponent implements OnInit {

  isRegistered = false;
  isAuthenticated = false;
  registered: string = 'Not-Registered';
  authenticated: string = 'Un-Authenticated';

  ws: WebSocket | undefined;
  constructor(
    private dataService: DataService,
    private http: HttpClient,
  ) {
    // const api = (<any>window).WS.widgetAPI();
    // // const api = (<any>window).WS.widgetAPI(interactionId);
    // const interactionId = this.getAttribute('interactionid');
    // console.log("interactionId =====>> "+interactionId);

    // var clientDetails = api.getClientDetails();
    // console.log("clientDetails =====>> "+clientDetails);

  }

  langtab: string = 'English';
  setLangTab(tab: string): void {
    this.langtab = tab;
  }
  isLangTab(tab: string): boolean {
    return this.langtab === tab;
  }

  tab: string = 'sessioninfo';
  setTab(tab: string): void {
    this.tab = tab;
  }
  isTab(tab: string): boolean {
    return this.tab === tab;
  }

  tabactive: string = 'conversation';
  setTabActive(tab: string): void {
    this.tabactive = tab;
  }
  isTabActive(tab: string): boolean {
    return this.tabactive === tab;
  }

  active: string = 'action';
  setActive(tab: string): void {
    this.active = tab;
  }
  isActive(tab: string): boolean {
    return this.active === tab;
  }

  activeTab: string = 'sms';
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  isActiveTab(tab: string): boolean {
    return this.activeTab === tab;
  }
  incident = {
    shortDescription: '',
    priority: '',
    assignmentGroup: '',
    callerId: ''
  };
  number = {
    shortDescription: '',
    priority: '',
    assignmentGroup: '',
    callerId: '',
    number: ''
  };
  currentSentiment: string = '';
  overallSentiment: string = '';
  chatBotSummary: string = ' chat bot summay chat bot summary';
  chatSummary: string ='A customer contacts the chatbot with a question about their recent order. The chatbot requests the order number, retrieves the details, and informs the customer that the order is in transit and will arrive within 2-3 business days. The customer then asks about returning an item from a previous order to which the chatbot provides instructions to visit the websites Returns section for guidance. The chatbot offers further assistance if needed.';

  chatDetails: { speaker: string; message: string }[] = [
    {
      speaker: 'Customer (User)',
      message:
        'Hi there! I have a question about my recent order. Can you help?',
    },
    {
      speaker: 'Chatbot (Assistant)',
      message:
        'Of course! I’d be happy to assist. Please provide your order number, and I’ll look up the details for you.',
    },
    { speaker: 'Customer (User)', message: 'My order number is 123456.' },
    {
      speaker: 'Chatbot (Assistant)',
      message: 'Thank you! Let me check that for you. One moment, please.',
    },
    {
      speaker: 'Chatbot (Assistant)',
      message:
        '(Chatbot processes the request and retrieves order information)',
    },
    {
      speaker: 'Chatbot (Assistant)',
      message:
        'I found your order! It’s currently in transit and should arrive within 2-3 business days. Is there anything else I can help with?',
    },
    {
      speaker: 'Customer (User)',
      message:
        'Actually, yes. I also wanted to know if I can return an item from my previous order.',
    },
    {
      speaker: 'Chatbot (Assistant)',
      message:
        'Certainly! To initiate a return, please visit our website and go to the “Returns” section. Follow the instructions there, and you’ll receive further guidance. If you have any other questions, feel free to ask!',
    },
  ];

  translatedEnglish: string = '';
  translatedHindi: string = '';

  ngOnInit(): void {
    //Translate Text

    this.dataService.translateData(this.chatSummary).subscribe((data) => {
      // console.log(data);
      this.translatedHindi = data.translatedMessage_hi;
      this.translatedEnglish = data.translatedMessage_en;
    });
    this.getData();
     this.getOveallSentiment();
  }

  getOveallSentiment(): void {
    let payload = {
      messages: [
        'I need information on courses',
        'Thank you for providing information on courses',
      ]
    };
    this.dataService.getOverallSenti(payload).subscribe((responce) => {

      this.overallSentiment = responce.overAllSentiment;

    });
    // console.log(this.overallSentiment);
    
  }

  getData(): void {
    let payload = {
      message: 'Thank you for providing information on courses'
    };
    this.dataService.getsentiment(payload).subscribe((data) => {

      for (let i = 0; i < data.length; i++) {
        this.currentSentiment = data[i].sentiment;
        break;
      }
    });
  }


  getEmoji(code: string): string {
    const twemojiUrl = `https://twemoji.maxcdn.com/2/svg/${code}.svg`;
    const span = document.createElement('span');
    span.className = 'twemoji';
    span.dataset['src'] = twemojiUrl;
    twemoji.parse(span);
    return span.outerHTML;
  }

  help() {
    const modldiv = document.getElementById(`myModal`);
    if (modldiv != null) {
      modldiv.style.display = `block`;
    }
  }

  Details() {
    const modldiv = document.getElementById(`details`);
    if (modldiv != null) {
      modldiv.style.display = `block`;
    }
  }
  ceateCase() {
    const modldiv = document.getElementById(`createCase`);
    if (modldiv != null) {
      modldiv.style.display = `block`;
    }
  }
  findCase() {
    const modldiv = document.getElementById(`findCase`);
    if (modldiv != null) {
      modldiv.style.display = `block`;
    }
  }
  createLead() {
    const modldiv = document.getElementById(`createLead`);
    if (modldiv != null) {
      modldiv.style.display = `block`;
    }
  }

  createNewIncident() {
    const modldiv = document.getElementById(`createNewIncident`);
    if (modldiv != null) {
      modldiv.style.display = `block`;
    }
  }

  getIncidentDetails() {
    const modldiv = document.getElementById(`getIncidentDetails`);
    if (modldiv != null) {
      modldiv.style.display = `block`;
    }
  }

  close() {
    const modldiv = document.getElementById(`myModal`);
    const modldiv2 = document.getElementById(`details`);
    const modldiv3 = document.getElementById(`createCase`);
    const modldiv4 = document.getElementById(`findCase`);
    const modldiv5 = document.getElementById(`createLead`);
    if (
      modldiv != null &&
      modldiv2 != null &&
      modldiv3 != null &&
      modldiv4 != null &&
      modldiv5 != null
    ) {
      modldiv.style.display = `none`;
      modldiv2.style.display = `none`;
      modldiv3.style.display = `none`;
      modldiv4.style.display = `none`;
      modldiv5.style.display = `none`;
    }
  }

  createSMSSession(): void {
    const url = 'https://app.journeyid.io/api/iframe/executions';
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYW1sZXNoamFpbiIsImlmciI6IjBlYjcyNDUzLTZmNmMtNDdhMC05YmRhLWYyOTFkN2E1MDNhOCIsImV4cCI6MTcwODY4NTAyNzgzOSwiaWF0IjoxNzA4Njg0OTQxfQ.28rpU-75lyTBO8ZpBP9HrlaWLZNMvc1qekZq92dNGFI',
      accept: 'application/json',
      'content-type': 'application/json',
    });

    const body = {
      user: {
        phoneNumber: '+917719810049',
        uniqueId: '917719810049',
      },
      language: 'en-US',
      delivery: {
        method: 'sms',
        phoneNumber: '+917719810049', //919552841999 //917719810049
      },
      configuration: {},
      pipelineKey: '990843ed-308c-432a-8e1d-a804a05aa66b',
    };

    this.http.post<any>(url, body, { headers }).subscribe(
      (data) => {
        const userId = data.user.id;
        const sessionId = data.session.id;
        this.constructWebSocketURLsms(userId, sessionId);
      },
      (error) => {
        console.error('Error creating session:', error);
      }
    );
  }

  constructWebSocketURLsms(userId: string, sessionId: string): void {
    const url = `wss://app.journeyid.io/api/iframe/ws/users/${userId}/sessions/${sessionId}`;
    console.log(url);
    // Establish WebSocket connectionng
    this.ws = new WebSocket(url);

    // WebSocket event listeners
    this.ws.onopen = (s) => {
      console.log('s==> ', s);

      this?.ws?.send(
        'CONNECT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYW1sZXNoamFpbiIsImlmciI6IjBlYjcyNDUzLTZmNmMtNDdhMC05YmRhLWYyOTFkN2E1MDNhOCIsImV4cCI6MTcwODY4NTAyNzgzOSwiaWF0IjoxNzA4Njg0OTQxfQ.28rpU-75lyTBO8ZpBP9HrlaWLZNMvc1qekZq92dNGFI'
      );

      console.log('WebSocket connection established');
    };

    this.ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log('Received event:', eventData);
      if (eventData.event === 'session-authenticated') {
        // Set isAuthenticated to true
        this.isAuthenticated = true;
        this.authenticated = 'Authenticated';
        if (this.ws != undefined) {
          this.ws.onclose = () => {
            console.log('WebSocket connection closed');
          };
        }
        console.log('Session authenticated. isAuthenticated set to true.');
      }
    };
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  createSession(): void {
    const url = 'https://app.journeyid.io/api/iframe/executions';
    const headers = new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE2MTY3OTQsImlmciI6ImVlY2ZjN2NmLWUzYmEtNDlmMi1iMGZjLWRiMzgwMDljMzM5NCJ9.y2i-4MW0-EyYLndYv3mzngDYumUTESXZHedL470lWSY',
      accept: 'application/json',
      'content-type': 'application/json',
    });

    const body = {
      user: {
        phoneNumber: '+917719810049',
        uniqueId: '917719810049',
      },
      language: 'en-US',
      delivery: {
        method: 'sms',
        phoneNumber: '+917719810049', //919552841999 //917719810049
      },
      configuration: {},
      pipelineKey: 'dc2db844-c4a9-45fe-9316-44edd90b68dd',
    };

    this.http.post<any>(url, body, { headers }).subscribe(
      (data) => {
        const userId = data.user.id;
        const sessionId = data.session.id;
        this.constructWebSocketURL(userId, sessionId);
      },
      (error) => {
        console.error('Error creating session:', error);
      }
    );
  }

  constructWebSocketURL(userId: string, sessionId: string): void {
    const url = `wss://app.journeyid.io/api/iframe/ws/users/${userId}/sessions/${sessionId}`;
    console.log(url);
    // Establish WebSocket connectionng
    this.ws = new WebSocket(url);

    // WebSocket event listeners
    this.ws.onopen = (s) => {
      console.log('s==> ', s);

      this?.ws?.send(
        'CONNECT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE2MTY3OTQsImlmciI6ImVlY2ZjN2NmLWUzYmEtNDlmMi1iMGZjLWRiMzgwMDljMzM5NCJ9.y2i-4MW0-EyYLndYv3mzngDYumUTESXZHedL470lWSY'
      );

      console.log('WebSocket connection established');
    };

    this.ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log('Received event:', eventData);
      if (
        eventData.event === 'session-authenticated' ||
        eventData.event === 'execution-completed'
      ) {
        // Set isAuthenticated to true
        this.isAuthenticated = true;
        this.authenticated = 'Authenticated';
        if (this.ws != undefined) {
          this.ws.onclose = () => {
            console.log('WebSocket connection closed');
          };
        }
        console.log('Session authenticated. isAuthenticated set to true.');
      }
    };
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  // createVoiceSession(): void {
  //   const url = 'https://app.journeyid.io/api/iframe/executions';
  //   const headers = new HttpHeaders({
  //     Authorization:
  //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE2MTY3OTQsImlmciI6ImVlY2ZjN2NmLWUzYmEtNDlmMi1iMGZjLWRiMzgwMDljMzM5NCJ9.y2i-4MW0-EyYLndYv3mzngDYumUTESXZHedL470lWSY',
  //     accept: 'application/json',
  //     'content-type': 'application/json',
  //   });

  //   const body = {
  //     user: {
  //       phoneNumber: '+917719810049',
  //       uniqueId: '917719810049',
  //     },
  //     language: 'en-US',
  //     delivery: {
  //       method: 'sms',
  //       phoneNumber: '+917719810049', //919552841999 //917719810049
  //     },
  //     configuration: {},
  //     pipelineKey: '87f267f1-bca6-4630-bce7-44b773b07e65',
  //   };

  //   this.http.post<any>(url, body, { headers }).subscribe(
  //     (data) => {
  //       const userId = data.user.id;
  //       const sessionId = data.session.id;
  //       this.constructVoiceWebSocketURL(userId, sessionId);
  //     },
  //     (error) => {
  //       console.error('Error creating session:', error);
  //     }
  //   );
  // }

  // constructVoiceWebSocketURL(userId: string, sessionId: string): void {
  //   const url = `wss://app.journeyid.io/api/iframe/ws/users/${userId}/sessions/${sessionId}`;
  //   console.log(url);
  //   // Establish WebSocket connectionng
  //   this.ws = new WebSocket(url);

  //   // WebSocket event listeners
  //   this.ws.onopen = (s) => {
  //     console.log('s==> ', s);

  //     this?.ws?.send(
  //       'CONNECT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE2MTY3OTQsImlmciI6ImVlY2ZjN2NmLWUzYmEtNDlmMi1iMGZjLWRiMzgwMDljMzM5NCJ9.y2i-4MW0-EyYLndYv3mzngDYumUTESXZHedL470lWSY'
  //     );

  //     console.log('WebSocket connection established');
  //   };

  //   this.ws.onmessage = (event) => {
  //     const eventData = JSON.parse(event.data);
  //     console.log('Received event:', eventData);
  //     if (
  //       eventData.event === 'session-authenticated' ||
  //       eventData.event === 'execution-completed'
  //     ) {
  //       // Set isAuthenticated to true
  //       this.isAuthenticated = true;
  //       this.authenticated = 'Authenticated';
  //       if (this.ws != undefined) {
  //         this.ws.onclose = () => {
  //           console.log('WebSocket connection closed');
  //         };
  //       }
  //       console.log('Session authenticated. isAuthenticated set to true.');
  //     }
  //   };
  //   this.ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };
  // }

  // createAppSession(): void {
  //   const url = 'https://app.journeyid.io/api/iframe/executions';
  //   const headers = new HttpHeaders({
  //     Authorization:
  //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE2MTY3OTQsImlmciI6ImVlY2ZjN2NmLWUzYmEtNDlmMi1iMGZjLWRiMzgwMDljMzM5NCJ9.y2i-4MW0-EyYLndYv3mzngDYumUTESXZHedL470lWSY',
  //     accept: 'application/json',
  //     'content-type': 'application/json',
  //   });

  //   const body = {
  //     user: {
  //       phoneNumber: '+917719810049',
  //       uniqueId: '917719810049',
  //     },
  //     language: 'en-US',
  //     delivery: {
  //       method: 'sms',
  //       phoneNumber: '+917719810049', //919552841999 //917719810049
  //     },
  //     configuration: {},
  //     pipelineKey: 'dc2db844-c4a9-45fe-9316-44edd90b68dd',
  //   };

  //   this.http.post<any>(url, body, { headers }).subscribe(
  //     (data) => {
  //       const userId = data.user.id;
  //       const sessionId = data.session.id;
  //       this.constructAppWebSocketURL(userId, sessionId);
  //     },
  //     (error) => {
  //       console.error('Error creating session:', error);
  //     }
  //   );
  // }

  // constructAppWebSocketURL(userId: string, sessionId: string): void {
  //   const url = `wss://app.journeyid.io/api/iframe/ws/users/${userId}/sessions/${sessionId}`;
  //   console.log(url);
  //   // Establish WebSocket connectionng
  //   this.ws = new WebSocket(url);

  //   // WebSocket event listeners
  //   this.ws.onopen = (s) => {
  //     console.log('s==> ', s);

  //     this?.ws?.send(
  //       'CONNECT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE2MTY3OTQsImlmciI6ImVlY2ZjN2NmLWUzYmEtNDlmMi1iMGZjLWRiMzgwMDljMzM5NCJ9.y2i-4MW0-EyYLndYv3mzngDYumUTESXZHedL470lWSY'
  //     );

  //     console.log('WebSocket connection established');
  //   };

  //   this.ws.onmessage = (event) => {
  //     const eventData = JSON.parse(event.data);
  //     console.log('Received event:', eventData);
  //     if (
  //       eventData.event === 'session-authenticated' ||
  //       eventData.event === 'execution-completed'
  //     ) {
  //       // Set isAuthenticated to true
  //       this.isAuthenticated = true;
  //       this.authenticated = 'Authenticated';
  //       if (this.ws != undefined) {
  //         this.ws.onclose = () => {
  //           console.log('WebSocket connection closed');
  //         };
  //       }
  //       console.log('Session authenticated. isAuthenticated set to true.');
  //     }
  //   };
  //   this.ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };
  // }
 


  // Ensure the import statements at the top of the file match the following


// Add a constructor inside your component class as follows


newShortDescription:string= '';
newPriority:string= '';
newAssignmentGroup:string= '';
newCallerId:string= '';
newNumber:string='';

onSubmitIncident() {
  this.dataService.createIncident(this.incident).subscribe(response => {
    console.log('Incident created successfully:', response);
    this.close();
    this.newNumber=response.result.number;
    this.newShortDescription=response.result.short_description;
    this.newPriority=response.result.priority;
    this.newAssignmentGroup=response.result.assignment_group;
    this.newCallerId=response.result.caller_id;
    
  }, error => {
    console.error('Error creating incident:', error);
  });
  this.createNewIncident();
}


shortDescription= '';
priority= '';
assignmentGroup= '';
callerId= '';

onSubmitGetIncident() {
  this.dataService.getIncident(this.number.number).subscribe(response => {
    console.log('Incident Fetched successfully:', response.result.number);
    console.log('Incident Fetched successfully:', response.result.short_description);
    console.log('Incident Fetched successfully:', response.result.priority);
    console.log('Incident Fetched successfully:', response.result.assignment_group);
    console.log('Incident Fetched successfully:', response.result.caller_id
  );
    console.log(response);
    
    this.close();
    this.shortDescription=response.result.shortDescription;
    this.priority=response.result.priority;
    this.assignmentGroup=response.result.assignmentGroup;
    this.callerId=response.result.callerId;
  }, error => {
    console.error('Error Fetching incident:', error);
  });
  
  this.getIncidentDetails();
}

}
