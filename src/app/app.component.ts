import { Component } from '@angular/core';
import { AppService } from '../app/Services/AppService'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetoAngular';
  tokenUser: string = "";

  displayedColumns: string[] = ['Id', 'Name'];
  dataSource: any;

  constructor(public AppService: AppService)
  {

  }

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit()
  {
    this.GerarToken();
  }

  onSubmit()
  {
    console.warn(this.profileForm.value);

    var inputName = this.profileForm.value["name"];
    this.ProductsAdd(inputName);
  }

  GerarToken()
  {
    this.AppService.GerarToken().toPromise().then((res) => {
      this.tokenUser = res;
      this.ProductsList();
    })
  }

  ProductsList()
  {
    this.AppService.ProductList(this.tokenUser).toPromise().then((products) => {
      var listProduct: any;
      listProduct = products;

      this.dataSource = listProduct;
    }).catch((err) => {
      var error = err;
    });
  }

  ProductsAdd(name: any)
  {
    var product = {
      Id: 0,
      Name: name,
      Image: ""
    };

    this.AppService.ProductAdd(product, this.tokenUser).toPromise().then((res) => {
      var ok = res;
      this.ProductsList();
      this.limpaCampos();

    }).catch((err) => {
      var error = err;
    });
  }

  limpaCampos()
  {
    this.profileForm.patchValue({
      name: ''
    })
  }
  
  carregarTela()
  {
    this.profileForm.patchValue({
      name: 'Campo Test',
    });
  }
}